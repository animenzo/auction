import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAuctionItem = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startingBid, setStartingBid] = useState("");
	const [endDate, setEndDate] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("jwt="))
			?.split("=")[1];
		if (token) {
			try {
				await axios.post(
					`${import.meta.env.VITE_BASE_URL}/auctions`,
					{ title, description, startingBid, endDate },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				navigate("/auctions");
			} catch (err) {
				setError("Failed to create auction. Please try again.");
				console.error(err);
			}
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card bg-dark text-light">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Create Auction</h2>
							{error && <p className="text-danger text-center">{error}</p>}
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">Title</label>
									<input
										id="title"
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="form-control bg-secondary text-light"
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<textarea
										id="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="form-control bg-secondary text-light"
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="startingBid" className="form-label">Starting Bid ($)</label>
									<input
										id="startingBid"
										type="number"
										value={startingBid}
										onChange={(e) => setStartingBid(e.target.value)}
										className="form-control bg-secondary text-light"
										min={0}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="endDate" className="form-label">End Date</label>
									<input
										id="endDate"
										type="datetime-local"
										value={endDate}
										onChange={(e) => setEndDate(e.target.value)}
										className="form-control bg-secondary text-light"
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary w-100">Create Auction</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAuctionItem;
