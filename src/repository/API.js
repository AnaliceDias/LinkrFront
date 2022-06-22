import axios from "axios";

const BASE_URL = "http://localhost:4000";
//const BASE_URL = "https://projeto17.herokuapp.com";

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

function getPosts(config) {
  const promise = axios.get(`${BASE_URL}/timeline`, config);
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

function checkIsFollowing(followId, config) {
  const promise = axios.get(`${BASE_URL}/follow/${followId}`, config);
  return promise;
}

function followUser(followId, body, config) {
  const promise = axios.post(`${BASE_URL}/follow/${followId}`, body, config);
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
  checkIsFollowing,
  followUser,
};

export default API;
