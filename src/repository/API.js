import axios from "axios";

const BASE_URL = "http://localhost:4000";

function createUser(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function login(body) {
  const promise = axios.post(`${BASE_URL}`, body);
  return promise;
}

function publishPost(body, config) {
  const promise = axios.post(`${BASE_URL}/timeline`, body, config);
  return promise;
}

function getPosts() {
  const promise = axios.get(`${BASE_URL}/timeline`);
  return promise;
}

function getUserPosts(userId) {
  const promise = axios.get(`${BASE_URL}/user/${userId}`);
  return promise;
}

function abrirHashtag(hashtag) {
  alert(hashtag);
}

function getUser(text) {
  const promise = axios.get(`${BASE_URL}/search/users/${text}`);
  return promise;
}

function deletePost(postId, config) {
  const promise = axios.delete(`${BASE_URL}/timeline/${postId}`, config);
  return promise;
}

function likePost(body, config) {
  const promise = axios.post(`${BASE_URL}/like`, body, config);
  return promise;
}

function checkLikePost(postId, config) {
  const promise = axios.get(`${BASE_URL}/like/${postId}`, config);
  return promise;
}

function getPostLikes(postId) {
  const promise = axios.get(`${BASE_URL}/likes/${postId}`);
  return promise;
}

function updatePost(body, postId, config) {
  const promise = axios.put(`${BASE_URL}/timeline/${postId}`, body, config);
  return promise;
}

function addComment(postId, body, config) {
  const promise = axios.post(
    `${BASE_URL}/timeline/comments/${postId}`,
    body,
    config
  );
  return promise;
}

function getComments(postId, config) {
  const promise = axios.get(`${BASE_URL}/timeline/comments/${postId}`, config);
  return promise;
}

const API = {
  createUser,
  login,
  publishPost,
  getPosts,
  likePost,
  checkLikePost,
  getPostLikes,
  getUser,
  deletePost,
  abrirHashtag,
  updatePost,
  getUserPosts,
  addComment,
  getComments
};

export default API;
