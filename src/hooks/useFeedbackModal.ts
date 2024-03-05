import { useContext } from 'react';
import { FeedbackModalContext } from '../hoc/FeedbackModalProvider.tsx';

export function useFeedbackModal() {
    return useContext(FeedbackModalContext);
}
