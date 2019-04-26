import React from 'react';
import VideoCall from './components/VideoCall';
import ReactDOM from 'react-dom'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<VideoCall />, root)
})