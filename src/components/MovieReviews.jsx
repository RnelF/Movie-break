import { useEffect, useState } from "react";
import DefaultAvatar from "../icons/default-avatar.png";
export default function MovieReviews({ movieId }) {
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  useEffect(() => {
    async function fetchMovieReview() {
      try {
        const res = await fetch(
          `${URL}?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setReviewData(data.results);
        setIsLoading(false);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setIsLoading(false);
      }
    }
    fetchMovieReview();
  }, [movieId]);

  const initialReviews = reviewData.slice(0, 2);
  const allReviews = reviewData;

  const toggleReviewContent = (id) => {
    setExpandedReviews((prevExpandedReviews) => ({
      ...prevExpandedReviews,
      [id]: !prevExpandedReviews[id],
    }));
  };

  return (
    <div className="p-4 m-4">
      {allReviews.length > 3 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className=" bg-blue-500 text-white p-2 rounded mt-4"
        >
          {showAllReviews ? "Hide Reviews" : "View All Reviews"}
        </button>
      )}
      <div>
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="lg:w-auto lg:grid grid-cols-2 gap-5">
            {allReviews.length > 0 ? (
              (showAllReviews ? allReviews : initialReviews).map((review) => (
                <div
                  key={review.id}
                  className="mt-3 615:mt-5 border border-gray-300 p-4 rounded-md"
                >
                  <div>
                    <div className="flex gap-1 items-end">
                      <div>
                        <img className="w-10 615:w-12" src={DefaultAvatar} />
                      </div>
                      <div>
                        <p className="text-base 615:text-lg">
                          Username: {review.author}
                        </p>
                      </div>
                    </div>

                    <p>{review.created_at}</p>
                  </div>
                  <div>
                    <p className="text-wrap text-sm 615:text-md">
                      {expandedReviews[review.id]
                        ? review.content // Show full content
                        : `${review.content.slice(0, 200)}...`}{" "}
                    </p>
                    {review.content.length > 200 && (
                      <button
                        onClick={() => toggleReviewContent(review.id)}
                        className="text-blue-500 underline mt-2"
                      >
                        {expandedReviews[review.id] ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews Available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
