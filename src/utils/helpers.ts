export interface MyError {
  code: string;
  message: string;
}

export function getAuthError(e: unknown): string {
  const error = e as MyError;
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/user-not-found':
      return 'User not found!';
    default:
      return error.message;
  }
}
