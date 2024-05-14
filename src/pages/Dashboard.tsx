import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

interface PostData {
  title: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    body: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError("Error fetching posts");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<PostData>(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );
      setSuccessMessage("Post created successfully");
      setErrorMessage("");
      fetchPosts();
      console.log(response.data); // You can log the created post data
    } catch (error) {
      setErrorMessage("Error creating post");
      setSuccessMessage("");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              name="body"
              value={postData.body}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default Dashboard;
