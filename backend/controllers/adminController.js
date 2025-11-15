import {db} from "../config/db.js";

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [username], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", err });

    if (result.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = result[0];

    if (admin.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    return res.json({
      message: "Admin login successful",
      admin_id: admin.admin_id,
      username: admin.username,
    });
  });
};
