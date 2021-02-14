import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 355,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#351f39",
    color: "#a0c1b8",
    borderRadius: "26px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  headerTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  Subheader: {
    color: "white",
    fontSize: "0.8rem",
    fontWeight: 400,
  },
  timeContent: {
    textAlign: "right",
    margin: 0,
    fontStyle: "italic",
  },
  timeRoot: {
    paddingTop: 5,
  },
  contentRoot: {
    padding: 5,
    paddingLeft: 15,
  },
}));

//--------inline styles----------------
const statusStyle = {
  height: "1.2rem",
  lineHeight: "1.2rem",
  textAlign: "center",
  backgroundColor: "#44bd32",
  color: "#fff",
  borderRadius: "9px",
  width: "8rem",
  fontSize: "0.7rem",
  margin: "0.3rem",
  marginBottom: "0.7rem",
};

const iconContainer = {
  margin: "5px auto",
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  border: "1px solid rgba(220, 221, 225, 0.2)",
  borderRadius: "1rem",
};

const iconStyle = {
  fill: "white",
  marginRight: 5,
  color: "#fff",
};

//---------------MAIN FUNCTION-------------------
export default function PostCard({ item, itemStatus, id }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.headerTitle,
        }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Avatar alt="Avatar" src={item.author_avatar} />
          </Avatar>
        }
        title={item.title}
      />
      <CardMedia className={classes.media} image={item.image_URL} />
      <CardHeader
        subheader={moment(item.publish_date).format("MMMM Do YYYY, h:mm")}
        classes={{
          subheader: classes.Subheader,
          content: classes.timeContent,
          root: classes.timeRoot,
        }}
      />
      <CardContent classes={{ root: classes.contentRoot }}>
        <LinesEllipsis
          text={item.content}
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </CardContent>
      <CardActions disableSpacing>
        <div style={iconContainer}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon style={iconStyle} />
            <span style={{ ...iconStyle, fontSize: "1rem" }}>
              {item.like_count}
            </span>
          </IconButton>
          <IconButton aria-label="page visited">
            <VisibilityIcon style={iconStyle} />
            <span style={{ ...iconStyle, fontSize: "1rem" }}>
              {item.view_count}
            </span>
          </IconButton>
          <IconButton aria-label="comment count">
            <ChatBubbleIcon style={iconStyle} />
            <span style={{ ...iconStyle, fontSize: "1rem" }}>
              {item.comment_count}
            </span>
          </IconButton>
        </div>
      </CardActions>
      {itemStatus == false ? null : item.status == "published" ? (
        <CardContent
          classes={{ root: classes.contentRoot }}
          style={{ padding: "0 0 5px 15px" }}
        >
          <p style={statusStyle}>Status: Published</p>
        </CardContent>
      ) : (
        <CardContent
          classes={{ root: classes.contentRoot }}
          style={{ padding: "0 0 5px 15px" }}
        >
          <p style={{ ...statusStyle, backgroundColor: "#e1b12c" }}>
            Status: Draft
          </p>
        </CardContent>
      )}
    </Card>
  );
}
