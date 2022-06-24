import axios from "axios";
import { useNavigate } from "react-router-dom";

//const BASE_URL = "https://projeto17.herokuapp.com";
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

function getPosts(config, offset) {
  if (!offset) {
    offset = 0;
  }
  const promise = axios.get(`${BASE_URL}/timeline?offset=${offset}`, config);
  return promise;
}

function getHashtagPosts(config, hashtag, offset) {
  if (!offset) {
    offset = 0
  }
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}?offset=${offset}`, config);
  return promise;
}

function getUserPosts(userId, offset) {
  if (!offset) {
    offset = 0;
  }
  const promise = axios.get(`${BASE_URL}/user/${userId}?offset=${offset}`);
  return promise;
}

function openHashtag(hashtag, config) {
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}`, config);
  return promise;
}

function getHashtagTrending(){
  const promise = axios.get(`${BASE_URL}/hashtag`)
  return promise;
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
function checkIsFollowing(followId, config) {
  const promise = axios.get(`${BASE_URL}/follow/${followId}`, config);
  return promise;
}

function followUser(followId, body, config) {
  const promise = axios.post(`${BASE_URL}/follow/${followId}`, body, config);
  return promise;
}

function getFollowsByUserId(config) {
  const promise = axios.get(`${BASE_URL}/follows`, config);
  return promise;
}

function repostPost(body, config) {
  const promise = axios.post(`${BASE_URL}/repost`, body, config);
  return promise;
}

function checkRepostCount(postId, config) {
  const promise = axios.get(`${BASE_URL}/reposts/${postId}`, config);
  return promise;
}

function getUserReposted(userId){
  const promise = axios.get(`${BASE_URL}/repost/${userId}`);
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
  openHashtag,
  getHashtagPosts,
  updatePost,
  getUserPosts,
  addComment,
  getComments,
  checkIsFollowing,
  followUser,
  getFollowsByUserId,
  repostPost,
  checkRepostCount,
  getUserReposted,
  getHashtagTrending,  
};

export default API;
