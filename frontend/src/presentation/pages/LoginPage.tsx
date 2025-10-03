import { useState, type FormEvent } from 'react';
import { loginUser } from '@/domain/usecases/loginUser';

//shadcn
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSuccessToast } from '@/domain/usecases/showSuccessToast';
import type { LoginCredentials } from '@/core/entities/User';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

function LoginPage({onLoginSuccess}: LoginPageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const credentials = { username, password }; 
            await loginUser(credentials); 
            const user: LoginCredentials = { username, password };
            showSuccessToast(user); 

            onLoginSuccess();
        } catch (err: any) {
            setError(err.message); 
        }
    };

    return (
        <>
            <h1 className='text-5xl m-5 text-lime-500'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <Input type='email' placeholder='Digite seu email' onChange={(e) => setUsername(e.target.value)} className='mb-2'/>
                    <Input type='senha' placeholder='Digite sua senha' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button type='submit' className='w-full bg-lime-500 hover:bg-lime-600 hover:cursor-pointer'>Entrar</Button>
                {error && <p className='bg-red-400 mt-2 rounded-xl p-2'>{error}</p>}
            </form>
        </>
    );

}

export default LoginPage;