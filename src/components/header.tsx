import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { AccountMe } from "../hooks/accountMe";
import logo from "../images/uber-eats.svg";

// todo: if logged in, display user name or emails.
// todo: if not, display login and signup icon.

export const Header: React.FC = ({}) => {
  const {data} = AccountMe()

  return (
    <header className=" bg-blue-300 py-4">
      <div className=" w-full px-5 xl:px-0 max-w-screen-2xl mx-auto bg-green-200 flex justify-between items-center">
        <img
          className="w-32"
          alt="Nuber Eats - Uber Eats Clone"
          src={logo}
        />
        {isLoggedInVar() ? (
        <span>
          <span className=" text-base "> <FontAwesomeIcon icon={faUser} /> </span>
          {data?.me.email}
        </span>): (
        <span>
          <Link to={'/'}>Login</Link>
        </span>
        )}
      </div>
    </header>
  )
}
  if(isLoggedInVar()){

  }else{
}