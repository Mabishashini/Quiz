import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const { gamePin } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const location = useLocation(); 
  const username = new URLSearchParams(location.search).get('username');
  const score = new URLSearchParams(location.search).get('score');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/leaderboard/${gamePin}`);
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [gamePin]);

  useEffect(() => {
    const fetchUserRank = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/rank?gamePin=${gamePin}&username=${username}`);
        setUserRank(response.data.rank);
      } catch (error) {
        console.error('Error fetching user rank:', error);
      }
    };

    fetchUserRank();
  }, [gamePin]);

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      navigate('/'); // Redirect to the home page when the back button is pressed
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <div className='quiz-created'>
      <Navbar />
      <div className="lb-container">
        <div className="lb-innerContainer">
          <h2 className='quiz-created-heading lb-title'>Leaderboard</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              
              <div className="lb-table">
                <table className='plain-table'>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Players</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='highlighted-row'>
                      <td>{userRank}</td>
                      <td>{username}</td>
                      <td>{score}</td>
                    </tr>
                    {leaderboard.map((entry, index) => (

                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{entry.username}</td>
                        <td>{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
