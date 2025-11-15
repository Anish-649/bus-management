import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const user_id = localStorage.getItem("user_id");

  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const [editing, setEditing] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [passwordForm, setPasswordForm] = useState({ old: "", new: "" });

  useEffect(() => {
    if (!user_id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/auth/user/${user_id}`);
        const data = res.data;

        setUser(data);
        setForm({ name: data.name, email: data.email, mobile: data.mobile });

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("mobile", data.mobile);

        window.dispatchEvent(new Event("userUpdated"));
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    fetchUser();
  }, [user_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:5000/auth/user/${user_id}`, form);

      setUser(form);
      localStorage.setItem("name", form.name);
      localStorage.setItem("email", form.email);
      localStorage.setItem("mobile", form.mobile);

      window.dispatchEvent(new Event("userUpdated"));
      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordForm.old || !passwordForm.new) {
      alert("Fill both fields");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/auth/user/${user_id}/password`,
        {
          old_password: passwordForm.old,
          new_password: passwordForm.new,
        }
      );

      alert("Password changed!");
      setChangingPass(false);
      setPasswordForm({ old: "", new: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        {!editing && !changingPass && (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Mobile:</b> {user.mobile || "-"}</p>

            <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
            <button className="change-pass-btn" onClick={() => setChangingPass(true)}>Change Password</button>
          </>
        )}

        {editing && (
          <form onSubmit={handleSave}>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />

            <label>Mobile</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        )}

        {changingPass && (
          <>
            <label>Old Password</label>
            <input type="password" value={passwordForm.old}
              onChange={(e) => setPasswordForm({ ...passwordForm, old: e.target.value })} />

            <label>New Password</label>
            <input type="password" value={passwordForm.new}
              onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })} />

            <button onClick={handlePasswordSave}>Save Password</button>
            <button onClick={() => setChangingPass(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
