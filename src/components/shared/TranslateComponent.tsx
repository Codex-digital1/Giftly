// import { useEffect, useRef, useState } from "react";

// const TranslateComponent: React.FC = () => {
//     const googleTranslateRef = useRef<HTMLDivElement | null>(null);
//     const [change, setChange] = useState<string>("en");

//     useEffect(() => {
//         const handleLanguageChange = () => {
//             const googleTranslateElement = document.querySelector<HTMLSelectElement>(".goog-te-combo");
//             if (googleTranslateElement) {
//                 googleTranslateElement.value = change;
//                 googleTranslateElement.dispatchEvent(new Event("change"));
//             }
//         };
//         handleLanguageChange();
//     }, [change]);

//     useEffect(() => {
//         const googleTranslateElementInit = () => {
//             if (window.google && window.google.translate && window.google.translate.TranslateElement) {
//                 new window.google.translate.TranslateElement(
//                     {
//                         pageLanguage: "en",
//                         includedLanguages: "en,bn,es,fr,de,hi,it,ja,ko,zh-CN,ru",
//                         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//                     },
//                     googleTranslateRef.current
//                 );

//                 const intervalId = setInterval(() => {
//                     const imgElement = document.querySelector<HTMLImageElement>('.goog-te-gadget-simple > img');
//                     if (imgElement) {
//                         // Create a new image
//                         const newImage = document.createElement('img');
//                         newImage.src = '/language.png'; 
//                         // newImage.style.height = '20px'; 
//                         // newImage.style.width = '20px'; 
//                         newImage.alt = 'Language Icon'; 
//                         newImage.className = 'iconColor';

                        
//                         imgElement.parentNode?.replaceChild(newImage, imgElement);
//                         clearInterval(intervalId); 
//                     }
//                 }, 100);

//                 return () => clearInterval(intervalId);
//             }
//         };

//         const script = document.createElement("script");
//         script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//         window.googleTranslateElementInit = googleTranslateElementInit;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <div ref={googleTranslateRef} className="flex justify-center items-end ">
//             {/* Google Translate will render here */}
//         </div>
//     );
// };
// export default TranslateComponent;



import { useEffect, useRef } from "react";

// Extending the Window interface to include the google property
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
                        clearInterval(intervalId); // Clear the interval after replacement
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
        <div ref={googleTranslateRef} className="flex justify-center items-end">
            {/* Google Translate will render here */}
        </div>
    );
};

export default TranslateComponent;
