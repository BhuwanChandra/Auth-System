import React from 'react';
import { Card, Button } from "antd";
import coverImage from "../programming-girl.svg";

const styleCard = {
  width: "fit-content",
  height: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: 'stretch'
};

const Home = ({ userDetails, logout }) => {
    const { Meta } = Card;
    return (
      <div style={styleCard}>
        <Card 
            style={{ minWidth: 300, maxWidth: 500 }}
            cover={
              <img
                alt="example"
                src={coverImage}
              />
            }
        >
          <Meta
            title={`Hello, ${userDetails.name}`}
            description="Welcome in the world of programming!"
          />
        </Card>
        <Button
        style={{marginTop: '20px'}}
          danger
          onClick={() => {
            logout();
          }}
        >
          LogOut
        </Button>
      </div>
    );
}

export default Home;
