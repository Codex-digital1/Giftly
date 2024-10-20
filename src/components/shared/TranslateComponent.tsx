import { useEffect, useRef, useState } from "react";

const TranslateComponent: React.FC = () => {
    const googleTranslateRef = useRef<HTMLDivElement | null>(null);
    const [change, setChange] = useState<string>("en");

    useEffect(() => {
        const handleLanguageChange = () => {
            const googleTranslateElement = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (googleTranslateElement) {
                googleTranslateElement.value = change;
                googleTranslateElement.dispatchEvent(new Event("change"));
            }
        };
        handleLanguageChange();
    }, [change]);

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
                        // Create a new language-related image
                        const newImage = document.createElement('img');
                        newImage.src = '/english1.png'; // Your image path
                        newImage.style.height = '20px'; // Set height to 20px
                        newImage.alt = 'Language Icon'; // Set alt text for the image
                        newImage.className = 'iconColor';

                        // Replace the existing image
                        imgElement.parentNode?.replaceChild(newImage, imgElement);
                        clearInterval(intervalId); // Stop the interval after replacement
                    }
                }, 100); // Check every 100ms

                return () => clearInterval(intervalId); // Clear interval on component unmount
            }
        };

        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        window.googleTranslateElementInit = googleTranslateElementInit; // No error now
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div ref={googleTranslateRef} className="flex justify-center items-end ">
            {/* Google Translate will render here */}
        </div>
    );
};

export default TranslateComponent;
