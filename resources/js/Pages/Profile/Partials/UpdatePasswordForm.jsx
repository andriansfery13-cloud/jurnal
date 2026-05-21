import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-white">Update Password</h2>
                <p className="mt-1 text-sm text-gray-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        className="input-premium w-full"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-2 text-sm text-red-400">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        className="input-premium w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className="input-premium w-full"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-2 text-sm text-red-400">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <Button type="submit" loading={processing}>Update Password</Button>

                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-emerald-400 font-medium">Password updated.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
