import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const secretKey = process.env.SECRET_ACCESS_TOKEN

export const getUsers = async (req, res, next) => {
  try {
    res.json(await User.find().populate('albums'));
  } catch (err) {
    next(err);
  }
}

// FUNKTIONIERT NOCH NICHT PERFEKT (Updater)
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('albums', 'users');
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

//birthdate macht probleme
export const regUser = async (req, res, next) => {
  try {
    const {username, firstname, lastname, birthdate, email, password, albums} = req.body;
// Hashen des PW
   /* const hashedPassword = await bcrypt.hash(req.bodypassword, 10)  
    const password = hashedPassword  */
// Neuen User erstellen
    const newUser = new User({
      username, firstname, lastname, birthdate, email, password, albums
    });
// User in die Datenbank speichern
    await User.create(newUser);
    res.status(201).json({ message: `Added user successfully.` });
  } catch (err) {
    const error = new Error("Creating user failed.");
    error.status = 500;
    next(err);
  }
}

// User login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    
    console.log("logged in")
    if (!user || user.password !== password) {
     console.log("Nicht geklappt"); 
     return res.status(401).json({ message: "Invalid credentials." });
    
    }

    const token = jwt.sign({ id: user._id, /*role: user.role*/ }, secretKey);

    res.json({ token });

  } catch (error) {
    res.send(error.message);
  }
}
