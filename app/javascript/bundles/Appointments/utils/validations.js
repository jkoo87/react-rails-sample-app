import moment from "moment";

export const validations = {
  checkMinLength: (text, minLength) => {
    if (text.length >= minLength) {
      return "";
    } else {
      return `length should be at least ${minLength} characters`;
    }
  },

  timeShouldBeInTheFuture: t => {
    if (moment(t).isValid() && moment(t).isAfter()) {
      return "";
    } else {
      return `can't be in the past`;
    }
  }
};
