declare module 'react-google-recaptcha' {
    import { Component } from 'react';

    interface ReCAPTCHAProps {
        sitekey: string;
        onChange: (value: string | null) => void;
        size?: 'normal' | 'compact' | 'invisible';
    }

    class ReCAPTCHA extends Component<ReCAPTCHAProps> { }

    export = ReCAPTCHA;
}
