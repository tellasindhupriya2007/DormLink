# DormLink - Hostel Management System

A web-based hostel management platform that digitalizes hostel communication, permissions, and approvals. Built as a 2nd Year Engineering Mini Project at BVRIT.

**Live Demo:** https://dormlink-two.vercel.app/

---

## About the Project

Managing hostel operations manually through registers and in-person approvals is slow and error-prone. DormLink replaces that with a clean digital platform where students can raise complaints, apply for outings, and track their requests, while faculty can review, approve, or reject them in real time.

The platform provides separate dashboards for students and faculty with secure Firebase authentication.

---

## Features

**Student Module**
- Secure student login
- Raise hostel complaints and track status
- Apply for outing permission
- View event notifications and updates

**Faculty Module**
- View all incoming student requests
- Approve or reject outing applications and complaints
- Post announcements and updates for students

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend and Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Deployment | Vercel |

---

## Getting Started

```bash
# Clone the repository
git clone <repo-link>

# Open in VS Code
code .

# Run with Live Server extension
# Right click index.html and select Open with Live Server
```

> Make sure you have the Live Server extension installed in VS Code.

---

## Project Structure

```
DormLink/
├── index.html
├── student/
│   ├── dashboard.html
│   ├── complaints.html
│   └── outing.html
├── faculty/
│   ├── dashboard.html
│   └── approvals.html
├── css/
├── js/
└── firebase/
``

## Future Enhancements

- Email notifications for approvals and rejections
- QR code based outing verification at the gate
- Analytics dashboard for faculty to track complaint trends
- Parent login to monitor student activity

---

## Acknowledgements

Developed as part of the 2nd Year Mini Project at BV Raju Institute of Technology, Narsapur, under the guidance of faculty advisors.
