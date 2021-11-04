import React from 'react'

const PasswordStrengthMeter = ({ password, username, email }) => {

  let passwordStrength = 0;

  const calculatePasswordStrength = () => {
    // 1. NOT less than 8 characters or more than 20 characters
    if (password.length>=8 && password.length<=20) {
      ++passwordStrength;
    }
    // 2. Does NOT contain the username or email string
    if (!password.includes(username) && !password.includes(email)) {
      ++passwordStrength;
    }
    // 3. contain at least one small alphabet (a-z), one CAPS alphabet (A-Z) and one numeral (0-9)
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      ++passwordStrength;
    }
    // 4. contain at least one of (@,#,$,%,^,&,+,=)
    if (/[@#$%^&+=]/.test(password)) {
      ++passwordStrength;
    }
    return passwordStrength;
  }

  const progressColor = (passwordStrength) => {
      switch(passwordStrength){
      case 1:
        return '#ff1f00';
      case 2:
        return '#ff5f00';
      case 3:
        return '#ffaf00';
      case 4:
        return '#00ff1f';
      default:
        return 'none';
    }
  }

  const changePasswordColor = (password) => ({
    width: `${calculatePasswordStrength(password) * 25}%`,
    background: progressColor(passwordStrength),
    height: '4px'
  });

  return (
    <div className="progress" style={{ height: '4px', margin: '0 0 5px'}}>
      <div className="progress-bar" style={changePasswordColor(password)}></div>
    </div>
  )
}

export default PasswordStrengthMeter
