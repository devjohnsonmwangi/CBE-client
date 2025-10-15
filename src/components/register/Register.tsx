import React, { useState } from 'react'
import authImage from '../../../public/images/loginimageatmwalimu.png'
import { useRegister } from '../../hooks/useRegister'

const Register: React.FC = () => {
		const registerMutation = useRegister()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const simpleValidate = () => {
		if (!fullName || fullName.trim().length < 3) return 'Enter your full name (min 3 chars)'
		if (!email || !email.includes('@')) return 'Enter a valid email'
		if (!phoneNumber || phoneNumber.length < 9) return 'Enter a valid phone number'
		if (password.length < 8) return 'Password must be at least 8 characters'
		if (password !== confirmPassword) return 'Passwords do not match'
		return null
	}

	const onSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault()
		const v = simpleValidate()
		if (v) {
			setErrorMsg(v)
			return
		}

		setErrorMsg(null)
			try {
				await registerMutation.mutateAsync({ full_name: fullName.trim(), email: email.trim().toLowerCase(), phone_number: phoneNumber.trim(), password })
				// redirect to login (coarse client-side redirect to avoid router typing issues)
				window.setTimeout(() => (window.location.href = '/login'), 600)
			} catch (err: any) {
			console.error('Register error', err)
			setErrorMsg(err?.message || 'Registration failed')
		}
	}

	return (
		<div className="font-sans h-screen bg-gray-50 flex flex-col">
			<div className="flex flex-grow flex-col lg:flex-row lg:overflow-hidden">
				<div className="flex w-full lg:w-1/2 justify-center items-center lg:items-start p-8 lg:p-10 bg-white lg:overflow-y-auto">
					<div className="text-left max-w-lg">
						<h1 className="text-4xl font-extrabold text-gray-800">Join the <span className="text-blue-600">@mwalimu</span> Community</h1>
						<p className="mt-4 text-gray-600">Unlock access to resources and connect with peers.</p>
						<div className="mt-8 block w-full"><img loading="lazy" src={authImage} alt="Students collaborating" className="w-full h-auto object-contain rounded-lg" /></div>
					</div>
				</div>

				<div className="w-full lg:w-1/2 flex justify-center items-center lg:items-start p-4 sm:p-6 lg:overflow-y-auto">
					<div className="card w-full bg-white max-w-md shadow-2xl rounded-2xl p-6">
						<h2 className="text-center text-blue-600 text-3xl font-bold mb-6">Create Your Account</h2>
						<form onSubmit={onSubmit} className="space-y-4">
							<input className="input input-bordered w-full" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} />
							<input className="input input-bordered w-full" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
							<input className="input input-bordered w-full" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
							<input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
							<input className="input input-bordered w-full" placeholder="Confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
							{errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
							<button type="submit" disabled={(registerMutation as any).isLoading} className="btn w-full bg-blue-600 text-white py-2 rounded">{(registerMutation as any).isLoading ? 'Creating...' : 'Create Account'}</button>
							<div className="text-center mt-2"><a href="/login" className="text-sm text-blue-600">Already have an account? Login</a></div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register