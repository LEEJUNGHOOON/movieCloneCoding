import React from "react";
import styled from "styled-components";
import Starimg from "../assets/star.png";
import EmptyStarimg from "../assets/emptyStar.png";

const Star = styled.img`
    // css
    }
`;
/**
 *
 * render deffrent starButton depends on user button click
 */
const LikeButton = ({ like, onClick }) => {
  return (
    <Star
      src={like ? Starimg : EmptyStarimg}
      style={{ width: "7%", height: "7%", float: "right" }}
      onClick={onClick}
    />
  );
};

export default LikeButton;
