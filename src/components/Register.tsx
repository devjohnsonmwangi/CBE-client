import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, User, Phone, Home } from 'lucide-react'
import authImage from '../../../public/images/loginimageatmwalimu.png'
import { useRegister } from '../hooks/useRegister'
import { useToast } from '../hooks/use-toast'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

// Validation schema for registration
const registerSchema = z
  .object({
    full_name: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone_number: z
      .string()
      .min(9, 'Phone number must be at least 9 characters'),
    address: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Helper function for field validation
const validateField = (value: any, validator: any) => {
  try {
    validator.parse(value)
    return undefined
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.format()._errors?.[0] || 'Invalid input' }
    }
    return { message: 'Invalid input' }
  }
}

const Register = () => {
  const { mutateAsync: registerUser, isPending } = useRegister()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      address: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    onSubmit: async ({ value }) => {
      try {
        // Extract the registration payload (exclude confirmPassword and terms)
        const { confirmPassword, terms, ...registrationData } = value

        // Submit the registration
        await registerUser(registrationData)

        // Show success message
        toast({
          variant: 'success',
          title: 'Registration Successful',
          description: 'Your account has been created successfully!',
        })

        // Redirect to login page
        window.setTimeout(() => (window.location.href = '/login'), 600)
      } catch (error: any) {
        console.error('Registration error', error)
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description:
            error?.message ||
            'Failed to create your account. Please try again.',
        })
      }
    },
  })

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="self-center text-2xl font-bold text-blue-700 whitespace-nowrap">
              @mwalimu
            </span>
          </a>
          <div className="hidden lg:flex space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </a>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col lg:flex-row pt-20">
        {/* Left side with image */}
        <div className="flex w-full lg:w-1/2 justify-center items-center lg:items-start p-8 lg:p-10 bg-white lg:overflow-y-auto">
          <div className="text-left max-w-lg">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Join the <span className="text-blue-600">@mwalimu</span> Community
            </h1>
            <p className="mt-4 text-gray-600">
              Unlock access to resources and connect with peers.
            </p>
            <div className="mt-8 block w-full">
              <img
                loading="lazy"
                src={authImage}
                alt="Students collaborating"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-4 sm:p-6 lg:p-10">
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
                <span className="text-blue-600">Create Account</span>
              </h2>
              <p className="mt-3 text-gray-600 text-lg">
                Join our community and start your learning journey.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="mt-6 space-y-5"
            >
              {/* Full Name Field */}
              <form.Field
                name="full_name"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.full_name),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.full_name),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="full_name"
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email Field */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.email),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.email),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email address"
                        className="pl-10 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Phone Number Field */}
              <form.Field
                name="phone_number"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.phone_number),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.phone_number),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone_number"
                      className="text-sm font-medium"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone_number"
                        type="tel"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your phone number"
                        className="pl-10 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Address Field (Optional) */}
              <form.Field
                name="address"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.address),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.address),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Address (Optional)
                    </Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="address"
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your address (optional)"
                        className="pl-10 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Password Field */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.password),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.password),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Create a secure password"
                        className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center pr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Confirm Password Field */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.confirmPassword),
                  onBlur: ({ value }) =>
                    validateField(value, registerSchema.shape.confirmPassword),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Confirm your password"
                        className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 focus:ring-blue-500 rounded-lg focus:ring-2 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center pr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Terms Agreement */}
              <form.Field
                name="terms"
                validators={{
                  onChange: ({ value }) =>
                    validateField(value, registerSchema.shape.terms),
                }}
              >
                {(field) => (
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{' '}
                        <a
                          href="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          terms and conditions
                        </a>
                      </Label>
                      {field.state.meta.errors?.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </form.Field>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isPending || isSubmitting}
                    className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
                  >
                    {isPending || isSubmitting ? (
                      <>
                        <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-r-2 border-white rounded-full"></span>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </Button>
                )}
              </form.Subscribe>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
