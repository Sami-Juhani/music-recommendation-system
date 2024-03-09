// ProfileUpdate.tsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import { UserContextType } from '../types/UserContextType';
import PathConstants from "../routes/PathConstants";
import '../styles/ProfileUpdate.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface ProfileUpdateFormState {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { user, setUser } : UserContextType = useContext(UserContext);

  const [formData, setFormData] = useState<ProfileUpdateFormState>({
    email:'',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user || !('id' in user)) {
      console.error('No user is logged in or user has no id');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      console.log(formData);

      if (!response.ok) {
        console.error('HTTP error', response.status);
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        console.log('Profile update successful:', data);
        setUser(data.user);
        navigate(PathConstants.HOME);
      } else {
        console.error('Profile update failed:', data.message);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (!confirmDelete) {
      return;
    }

    if (!user || !('id' in user)) {
      console.error('No user is logged in or user has no id');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('HTTP error', response.status);
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        console.log('Profile delete successful:', data);
        setUser(undefined);
        navigate(PathConstants.HOME);
      } else {
        console.error('Profile delete failed:', data.message);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='profile_update_form'>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
      <button className='update_profile' type="submit">Update Profile</button>
      <button className='cancel' onClick={() => navigate(PathConstants.HOME)}>Cancel</button>
      <button type='submit' className='delete' onClick={deleteProfile}>Delete Profile</button>
    </form>
  );
};

export default ProfileUpdate;