import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { callAPi } from "../utils/callApi";
import InfoDialog from "./InfoDialog";
import { useHistory } from "react-router-dom";
// import PostListing from "./PostListing";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing * 6,
    maxWidth: 500,
    margin: "auto",
    border: "1px solid black",
    padding: theme.spacing * 5,
    marginTop: theme.spacing * 3,
  },
  margin: {
    margin: theme.spacing,
  },
  textField: {
    flexBasis: 200,
    display: "block",
  },
  button: {
    margin: theme.spacing,
  },
  input: {
    display: "none",
  },
  date: {
    flexBasis: 200,
    display: "block",
    marginLeft: theme.spacing * 1.5,
  },
  createdAt: {
    paddingLeft: "16px",
    fontVariant: "diagonal-fractions",
    fontWeight: 700,
    color: "cadetblue",
  },
  like: {
    paddingLeft: "16px",
    fontWeight: 700,
    color: "cadetblue",
  },
});

const defaultState = {
  text: "",
  createdAt: null,
  like: null,
};

const CreatePost = ({ classes, editMode, match }) => {
  const [state, setState] = useState(defaultState);
  const [open, setDialog] = useState(false);
  const [isFormValueChanged, setFormValueChanged] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const { text, createdAt, like } = state;

  const id = match?.params?.id || null;
  const params = {
    url: editMode ? `/posts/update/${id}` : "/posts/create",
    method: editMode ? "put" : "post",
  };
  const history = useHistory();
  useEffect(() => {
    if (editMode) {
      callAPi({
        url: `/posts/listing?id=${id}`,
        method: "get",
      }).then((result) => {
        if (result.status === 200) {
          const { data } = result;
          const [object] = data;
          setState({
            ...object,
          });
        }
      });
    }
  }, [editMode, id]);

  const handleSubmit = (e, { url, method }, actionType) => {
    const isDeleteOperation = editMode && actionType && actionType === "DELETE";
    if (isDeleteOperation) {
      method = "delete";
      url = `/posts/delete/${id}`;
    }

    if (text || isDeleteOperation) {
      callAPi({
        url,
        method,
        data: { text, like },
      }).then((result) => {
        setDialog(true);
        setTimeout(() => {
          setDialog(false);
        }, 1500);
        if (editMode) {
          history.goBack();
        }
      });
    } else {
      alert("Please fill all the required field");
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.container} noValidate>
        <Typography align="center" color="primary" variant="h5" gutterBottom>
          {editMode ? "Modify Post" : "Add Post "}
        </Typography>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label={editMode ? "" : "Write post"}
          name="text"
          value={text}
          onChange={({ target: { value, name } }) => {
            setState({ ...state, [name]: value });
            setFormValueChanged(true);
          }}
          fullWidth
          multiline={true}
          minRows={6}
          maxRows={8}
        />
        {editMode && (
          <Typography variant="h5" component="h6" className={classes.createdAt}>
            Created on : {new Date(createdAt).toGMTString()}
          </Typography>
        )}
        {editMode && (
          <Typography variant="h5" component="h5" className={classes.like}>
            Likes : {like}
            <hr />
            Hit{" "}
            <ThumbUp
              onClick={() => {
                if (!hasLiked) {
                  setState({ ...state, like: state.like + 1 });
                  setFormValueChanged(true);
                  setHasLiked(true);
                }
              }}
              color="primary"
            />
          </Typography>
        )}

        {editMode && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e) => handleSubmit(e, params)}
            disabled={!text || !isFormValueChanged}
          >
            Update
          </Button>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) =>
            handleSubmit(e, params, editMode ? "DELETE" : "CREATE")
          }
          disabled={!text}
        >
          {editMode ? "DELETE " : "ADD"}
        </Button>
      </form>
      {/* <PostListing /> */}
      <InfoDialog
        open={open}
        handleClose={(e) => setDialog(false)}
        title={"Message"}
        text={"Operation Successfully Completed"}
      />
    </div>
  );
};

CreatePost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreatePost);
