import { useState } from "react";
import {useAuthStore} from '../stores/useAuthStore.js'
import { LoaderIcon } from "lucide-react";

export default function SignupPage() {

  const [formData, setFormData] = useState({fullName:"",email:"",password:""})
  const {isSigningUp,signup} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="signup-root">
      {/* Decorative blobs - match App theme */}
      <div className="signup-blob signup-blob--1" />
      <div className="signup-blob signup-blob--2" />

      <div className="signup-card">
        {/* Left panel — branding */}
        <div className="signup-panel">
          <div className="signup-panel__logo">
            <span className="signup-panel__logo-icon">✦</span>
            <span className="signup-panel__logo-name">Chit-Chat</span>
          </div>

          <div className="signup-panel__copy">
            <h1 className="signup-panel__headline">
              Connect.<br />
              Converse.<br />
              Create.
            </h1>
            <p className="signup-panel__sub">
              A space for real conversations. Join thousands already talking.
            </p>
          </div>

          <div className="signup-panel__orbs">
            <span className="signup-panel__orb signup-panel__orb--a" />
            <span className="signup-panel__orb signup-panel__orb--b" />
            <span className="signup-panel__orb signup-panel__orb--c" />
          </div>
        </div>

        {/* Right panel — form */}
        <div className="signup-form-panel">
          <div className="signup-form-panel__inner">
            <div className="signup-form-header">
              <h2 className="signup-form-header__title">Create account</h2>
              <p className="signup-form-header__sub">
                Already have one?{" "}
                <a href="/login" className="signup-link">
                  Sign in
                </a>
              </p>
            </div>

            {/* Social buttons */}
            <div className="signup-social">
              <button type="button" className="signup-social__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button type="button" className="signup-social__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            <div className="signup-divider">
              <span className="signup-divider__line" />
              <span className="signup-divider__text">or</span>
              <span className="signup-divider__line" />
            </div>

            {/* Form fields */}
            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="signup-field">
                <label htmlFor="fullname" className="signup-field__label">
                  Full name
                </label>
                <div className="signup-field__wrap">
                  <span className="signup-field__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Enter Fullname"
                    className="signup-field__input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData,fullName: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="signup-field">
                <label htmlFor="email" className="signup-field__label">
                  Email address
                </label>
                <div className="signup-field__wrap">
                  <span className="signup-field__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData,email:e.target.value})}
                    className="signup-field__input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="signup-field">
                <label htmlFor="password" className="signup-field__label">
                  Password
                </label>
                <div className="signup-field__wrap">
                  <span className="signup-field__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData,password: e.target.value})}
                    placeholder="Enter Password"
                    className="signup-field__input"
                  />
                    <button
                      type="button"
                      className="signup-field__eye"
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? (
                        // Crossed eye (password visible)
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 2 12 2 12a21.77 21.77 0 0 1 5.06-6.94"/>
                          <path d="M1 1l22 22"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 5c7 0 10 7 10 7a21.77 21.77 0 0 1-3.28 4.36"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      ) : (
                        // Normal eye (password hidden)
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button> 
                </div>
              </div>

              {/* Terms */}
              <label className="signup-terms">
                <input type="checkbox" className="signup-terms__check" />
                <span className="signup-terms__text">
                  I agree to the{" "}
                  <a href="/terms" className="signup-link">Terms</a>
                  {" "}and{" "}
                  <a href="/privacy" className="signup-link">Privacy Policy</a>
                </span>
              </label>

              {/* Submit */}
              <button type="submit" disabled={isSigningUp} className="signup-btn">
                <span>{isSigningUp ? (<LoaderIcon className="w-full h-5 animate-spin text-center" />) : ("Create Account")}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

