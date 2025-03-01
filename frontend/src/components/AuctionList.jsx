import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

function AuctionList() {
	const [auctionItems, setAuctionItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(() => []);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchAuctionItems = async () => {
			const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auctions`);
			const items = Array.isArray(res.data) ? res.data : [];
			setAuctionItems(items);
			setSearchResults(items);
			setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE));
		};
		fetchAuctionItems();
	}, []);

	useEffect(() => {
		const filterItems = () => {
			const filteredItems = auctionItems.filter((item) => {
				const title = item.title || "";
				const description = item.description || "";
				const startingBid = item.startingBid
					? item.startingBid.toString()
					: "";
				const endDate = item.endDate
					? new Date(item.endDate).toLocaleDateString()
					: "";

				const searchTermString = searchTerm.toLowerCase();

				const matchesTitle = title
					.toLowerCase()
					.includes(searchTermString);
				const matchesDescription = description
					.toLowerCase()
					.includes(searchTermString);
				const matchesStartingBid =
					startingBid.includes(searchTermString);
				const matchesEndDate = endDate.includes(searchTermString);

				return (
					matchesTitle ||
					matchesDescription ||
					matchesStartingBid ||
					matchesEndDate
				);
			});
			setSearchResults(filteredItems);
			setTotalPages(
				Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 0
			);
			setCurrentPage(1);
		};
		filterItems();
	}, [searchTerm, auctionItems]);

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedItems = Array.isArray(searchResults) ? searchResults.slice(startIndex, endIndex) : [];

    return (
        <div className="container mt-5 p-4 bg-dark text-white rounded shadow-lg">
            <h2 className="display-4 mb-4">Auction Items</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Title, Description, Starting Bid, End Date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                />
            </div>
            <ul className="list-group">
                {paginatedItems.map((item) => (
                    <li
                        key={item._id}
                        className="list-group-item bg-secondary text-white mb-2"
                    >
                        <Link
                            to={`/auction/${item._id}`}
                            className="text-info h5"
                        >
                            {item.title}
                        </Link>
                        <p className="mt-2">
                            <b>{item.description}</b>
                        </p>
                        <p className="mt-2">
                            <b>Starting Bid:</b> ${item.startingBid}
                        </p>
                        <p className="mt-2">
                            <b>End Date: </b>
                            {new Date(item.endDate).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`btn btn-primary ${currentPage === 1 ? "disabled" : ""}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages == 0 ? 1 : totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`btn btn-primary ${totalPages === 0 || currentPage === totalPages ? "disabled" : ""}`}
                    disabled={totalPages === 0 || currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AuctionList;