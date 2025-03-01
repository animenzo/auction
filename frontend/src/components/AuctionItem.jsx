import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ITEMS_PER_PAGE = 10;

function AuctionItem() {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState(null);
	const [user, setUser] = useState(null);
	const [bids, setBids] = useState([]);
	const [winner, setWinner] = useState("");
	const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loadingBids, setLoadingBids] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuctionItem = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auctions/${id}`);
				setAuctionItem(res.data);
			} catch (error) {
				console.error("Error fetching auction item:", error);
			}
		};

		const fetchUser = async () => {
			const token = document.cookie.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
			if (token) {
				try {
					const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/profile`, {}, { headers: { Authorization: `Bearer ${token}` } });
					setUser(res.data);
				} catch (error) {
					console.error("Error fetching user profile:", error);
				}
			}
		};

		const fetchWinner = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auctions/winner/${id}`);
				setWinner(res.data.winner);
			} catch (error) {
				if (error.response.data.winner !== "") {
					console.error("Error fetching auction winner:", error);
				}
			}
		};

		fetchAuctionItem();
		fetchUser();
		fetchWinner();
	}, [id]);

	useEffect(() => {
		const fetchBids = async () => {
			setLoadingBids(true);
			try {
				const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/bids/${id}`);
				const sortedBids = Array.isArray(res.data) ? res.data.sort((a, b) => b.bidAmount - a.bidAmount) : [];
				setBids(sortedBids);
				setTotalPages(Math.ceil(sortedBids.length / ITEMS_PER_PAGE) || 0);
			} catch (error) {
				console.error("Error fetching bids:", error);
			} finally {
				setLoadingBids(false);
			}
		};
		fetchBids();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`${import.meta.env.VITE_BASE_URL}/auctions/${id}`);
			navigate("/auctions");
		} catch (error) {
			console.error("Error deleting auction item:", error);
		}
	};

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	if (!auctionItem || !user) {
		return <p className="mt-3 text-center">Loading...</p>;
	}

	const highestBid = bids.length > 0 ? Math.max(...bids.map((bid) => bid.bidAmount)) : 0;

	return (
		<div className="container mt-5 p-4 bg-dark text-white rounded">
			<h2 className="mb-3">{auctionItem.title}</h2>
			<p>{auctionItem.description}</p>
			<p><strong>Starting Bid:</strong> ${auctionItem.startingBid}</p>
			<p><strong>Current Highest Bid:</strong> ${highestBid}</p>

			<h3 className="mt-4">Bids</h3>
			{loadingBids ? (
				<p>Loading bids...</p>
			) : bids.length ? (
				<ul className="list-group">
					{bids.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((bid) => (
						<li key={bid._id} className="list-group-item bg-secondary text-white">
							<strong>{bid.userId.username}</strong>: ${bid.bidAmount}
						</li>
					))}
				</ul>
			) : (
				<p>No bids yet.</p>
			)}

			<div className="mt-3 d-flex justify-content-between">
				<button className="btn btn-primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
				<span>Page {currentPage} of {totalPages || 1}</span>
				<button className="btn btn-primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
			</div>

			{auctionItem.createdBy === user.id ? (
				<div className="mt-4">
					<Link to={`/auction/edit/${id}`} className="btn btn-warning me-2">Edit</Link>
					<button className="btn btn-danger" onClick={handleDelete}>Delete</button>
				</div>
			) : (
				<Link to={`/auction/bid/${id}`} className="btn btn-success mt-4">Place a Bid</Link>
			)}
		</div>
	);
}

export default AuctionItem;
