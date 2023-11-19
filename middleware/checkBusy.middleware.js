import User from "../models/user.model.js";

const isBusy = async (req, res, next) => {
  const { selectedTeacher, date } = req.body;
  console.log("dkjdjhjgegif", selectedTeacher, date);

  const instructor = selectedTeacher;

  if (!instructor || !date) {
    return res.status(400).json({
      success: false,
      message: "fill all details",
    });
  }

  const user = await User.findOne({ fullname: instructor });

  const { lectures } = user;


  for (let i = 0; i < lectures.length; i++) {
    let date1 = new Date(lectures[i].date);
    let date2 = new Date(date);
    if (date1.toISOString() == date2.toISOString()) {
      return res.status(400).json({
        success: false,
        message: `${instructor} is busy in another lecture on this date`,
      });
    }
  }

  next();
};

export { isBusy };
