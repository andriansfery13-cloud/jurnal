import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        setTimeout(() => passwordInput.current?.focus(), 250);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-white">Delete Account</h2>
                <p className="mt-1 text-sm text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <Button variant="outline" className="text-red-400 border-red-500/50 hover:bg-red-500/10" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-navy-900 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-lg font-semibold text-white mb-2">Are you sure you want to delete your account?</h2>
                        <p className="text-sm text-gray-400 mb-6">
                            Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                        </p>

                        <form onSubmit={deleteUser}>
                            <input
                                type="password"
                                className="input-premium w-full mb-2"
                                placeholder="Password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoFocus
                            />
                            {errors.password && <p className="text-sm text-red-400 mb-4">{errors.password}</p>}

                            <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="outline" onClick={closeModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" className="bg-red-600 hover:bg-red-500 text-white border-none" loading={processing}>
                                    Delete Account
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
