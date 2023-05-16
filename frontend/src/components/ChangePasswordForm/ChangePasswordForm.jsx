import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ChangePasswordForm.module.css'
import * as authService from '../../services/authService'

const ChangePasswordForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    old_password: '',
    new_password1: '',
    new_password2: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.changePassword(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { old_password, new_password1, new_password2 } = formData

  const isFormInvalid = () => {
    return !(old_password && new_password1 && new_password1 === new_password2)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>
          Current Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="password"
          value={old_password}
          name="old_password"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPassword" className={styles.label}>
          New Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="newPassword"
          value={new_password1}
          name="new_password1"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPasswordConf" className={styles.label}>
          Confirm New Password
        </label>
        <input
          type="password"
          autoComplete="off"
          id="newPasswordConf"
          value={new_password2}
          name="new_password2"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Change Password
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default ChangePasswordForm
