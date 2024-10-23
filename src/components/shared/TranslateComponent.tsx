import { useEffect, useRef } from "react";

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

const TranslateComponent: React.FC = () => {
    const googleTranslateRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const googleTranslateElementInit = () => {
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,bn,es,fr,de,hi,it,ja,ko,zh-CN,ru",
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    googleTranslateRef.current
                );

                const intervalId = setInterval(() => {
                    const imgElement = document.querySelector<HTMLImageElement>('.goog-te-gadget-simple > img');
                    if (imgElement) {
                        // Create a new image
                        const newImage = document.createElement('img');
                        newImage.src = '/language.png';
                        newImage.alt = 'Language Icon';
                        newImage.className = 'iconColor';

                        imgElement.parentNode?.replaceChild(newImage, imgElement);
                        clearInterval(intervalId);
                    }
                }, 100);

                return () => clearInterval(intervalId);
            }
        };

        // Dynamically add the Google Translate script
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        window.googleTranslateElementInit = googleTranslateElementInit;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div ref={googleTranslateRef} className="flex justify-center items-end mt-2">
            {/* Google Translate will render here */}
        </div>
    );
};

export default TranslateComponent;

