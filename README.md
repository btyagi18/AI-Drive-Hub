## 🚀 AI-Drive-Hub – Intelligent Ride Dispatch & Real-Time Reassignment System

A smart AI-powered ride dispatch system with real-time location tracking, automatic driver reassignment, and a modern UI.

### 🌍 Live Public URL 
  
🔗 https://ai-drive-hub-1.onrender.com/

 Open Browser Tab 1: Select Rider Option
 
 Open Browser  Tab 2: Select Driver Option 

### 🌟 Overview

AI-Drive-Hub is an intelligent ride-allocation platform designed to simulate how real ride-hailing apps assign drivers, track live locations, detect delays. 
It automatically reassign drivers when existing driver gets stuck in traffic.

This project demonstrates:

✔ Real-time communication using WebSockets

✔ AI-like logic for automatic driver fallback

✔ Live geolocation updates

✔ Driver movement simulation

✔ Stuck-driver detection + reassignment

✔ Modern, clean UI with animated elements

✔ Full MERN-based structure with socket engine


### 🧠 Key Features

🔹 1. Smart Driver Matching

Finds the nearest available driver

Uses location + random speed for dynamic selection

Assigns fastest & closest driver automatically

🔹 2. AI-Based Reassignment

Detects when a driver is “stuck in traffic”

Automatically reassigns a new driver

Notifies rider in real-time using instant events

🔹 3. Real-Time Live Tracking

Rider sees driver movement on map

Live driver updates every 2 seconds

Smooth location simulation using Leaflet

🔹 4. Modern Premium UI

Gradient background

Glassmorphism cards

Animated indicators

Fully responsive & minimal design

🔹 5. Scalable Architecture

Modular backend

Clean React frontend

Fully socket-driven communication

MongoDB storage for drivers & ride status


### 🏗️ Tech Stack

⚙️ Backend

-Node.js	               :-     Core backend environment

-Express.js	             :-    Routing & server creation

-Socket.io (Server)	     :-    Real-time connection between rider & driver

-MongoDB + Mongoose	     :-    Storing driver/ride states

-Nodemon	               :-    Auto server reload during dev

🌐 Frontend

-React.js (Vite)	             :-     Fast frontend build + UI components

-Tailwind CSS	                 :-     Modern, utility-first styling

-React Hot Toast	             :-    Popup notifications for events

-Leaflet + React-Leaflet	     :-   Live map visualizations

-Glassmorphism + Gradient UI	 :- Premium look & feel

⚡ Real-Time System

1. WebSocket channels for:

   -Driver online / offline
   
   -Driver location updates
   
   -Ride request
   
   -Ride matched
   
   -Driver stuck event
   
   -Reassignment event
   
3. Automatic fallback driver generation for availability

### 📌 Core Project Workflow

1️⃣ Rider requests a ride

→ Backend starts searching for nearby drivers
→ Shows “Searching for drivers…” message

2️⃣ Best driver automatically selected

→ Backend emits ride-started
→ Rider UI updates instantly

3️⃣ Driver location updates live

→ Map updates every 2 seconds

4️⃣ Backend detects driver is stuck

→ Emits driver-stuck event
→ Rider gets real-time warning

5️⃣ System reassigns new driver

→ “New Driver Assigned” toast appears
→ Map shows updated driver location




<img width="1884" height="930" alt="Screenshot 2026-01-29 190312" src="https://github.com/user-attachments/assets/a699aeeb-c5c7-4b0e-a6a8-204b360e57b0" />


<img width="1820" height="931" alt="Screenshot 2026-01-29 190411" src="https://github.com/user-attachments/assets/2d7a1fcc-ef5c-418f-916a-fc18ab48e649" />


<img width="1718" height="934" alt="Screenshot 2026-01-29 190852" src="https://github.com/user-attachments/assets/e863f54b-2205-40a1-b5ba-f0abdb0137f7" />


<img width="1718" height="946" alt="Screenshot 2026-01-29 190541" src="https://github.com/user-attachments/assets/2b6b4a30-41ad-4ff1-a94e-ad1d8a0b5d69" />

