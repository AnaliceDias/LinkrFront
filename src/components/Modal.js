import Modal from "react-modal";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import API from "../repository/API";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333333",
    padding: "0",
    height: "210px",
    minWidth: "597px",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

Modal.setAppElement("#root");

export default function Popup({
  setPosts,
  deletePostId,
  setDeletePostId,
  isOpen,
  setIsOpen,
  isDeleting,
  setIsDeleting
}) {
  const data = JSON.parse(localStorage.getItem("data"));
  const token = data.token;
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  return (
    <>
      <Modal style={customStyles} isOpen={isOpen}>
        <DeleteMessage>
          {isDeleting
            ? "Deleting..."
            : "Are you sure you want to delete this post?"}
        </DeleteMessage>
        <LoadingContainer isDeleting={isDeleting}>
          <Oval
            ariaLabel="loading-indicator"
            height={60}
            width={60}
            strokeWidth={1}
            strokeWidthSecondary={2}
            color="#1877f2"
            secondaryColor="white"
          />
          ;
        </LoadingContainer>
        <ActionsContainer isDeleting={isDeleting}>
          <button
            id="deny-btn"
            onClick={() => {
              setIsDeleting(false);
              setIsOpen(false);
              setDeletePostId(null);
            }}
          >
            No, go back
          </button>
          <button
            id="accept-btn"
            onClick={() => {
              setIsDeleting(true);
              API.deletePost(deletePostId, config)
                .then(() => {
                  API.getPosts()
                    .then(response => {
                      setPosts(response.data);
                      setIsOpen(false);
                      setIsDeleting(false);
                      setDeletePostId(null);
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => {
                  console.log(error);
                  setIsOpen(false);
                  setIsDeleting(false);
                  setDeletePostId(null);
                });
            }}
          >
            Yes, delete it
          </button>
        </ActionsContainer>
      </Modal>
    </>
  );
}

const DeleteMessage = styled.h2`
  text-align: center;
  width: 338px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 41px;
  margin-top: 26px;
  margin-bottom: 30px;
  color: #ffffff;
`;

const ActionsContainer = styled.div`
  width: 300px;
  display: ${props => (props.isDeleting ? "none" : "flex")};
  justify-content: space-between;

  button {
    width: 134px;
    height: 34px;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    font-size: 15px;
    font-family: "Lato";
    font-style: normal;
  }

  #deny-btn {
    color: #1877f2;
    background-color: #ffffff;
  }

  #accept-btn {
    color: #ffffff;
    background-color: #1877f2;
  }
`;

const LoadingContainer = styled.div`
  display: ${props => (props.isDeleting ? "block" : "none")};
`;
