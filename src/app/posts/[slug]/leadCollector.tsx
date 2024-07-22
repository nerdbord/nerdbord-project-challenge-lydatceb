import { useState, FormEvent, Dispatch, SetStateAction } from 'react';

interface LeadCollectorProps {
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    closePopup: ()=>void,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const LeadCollector: React.FC<LeadCollectorProps> = ({ email, setEmail, closePopup, isLoading, setIsLoading }) => {



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch('/api/postEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                console.log('Email saved successfully!');
            } else {
                console.error('Failed to save email.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        setEmail('');
        closePopup();
    };

    return (
        <div className="fixed mt-0 inset-0 flex items-center justify-center bg-black/50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-2">Subscribe for updates!</h2>
                <h1 className='text-l mb-4'>You will receive an email whenever a new post appears.</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LeadCollector;
