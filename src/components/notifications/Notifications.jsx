import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

const Notifications = ({ status, clearStatus }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    if (status.length) {
      setMessage(status[0]);
      setOpen(true);
    }
    return () => {
      setMessage(null);
    };
  }, [status]);

  const handleClose = () => {
    setOpen(false);
  };

  const capitalizeMessage = message => {
    return `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
  };

  return (
    message && (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        variant="success"
        open={open}
        autoHideDuration={2000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        onClose={handleClose}
        onExited={clearStatus}
        message={
          <Typography color="secondary" id="message-id">
            {capitalizeMessage(message)}
          </Typography>
        }
      />
    )
  );
};
Notifications.propTypes = {
  status: PropTypes.arrayOf(PropTypes.string),
  clearStatus: PropTypes.func
};
Notifications.defaultProps = {
  status: ["hello", "world"],
  clearStatus: () => console.log("clearStatus")
};

export default Notifications;
