import React from 'react'

interface IFormErrorProps{
    errorMessage: string | null;
    
}

export const FormError: React.FC<IFormErrorProps> = ({errorMessage}) => (
    <span className='errortext'>{errorMessage}</span>
) 