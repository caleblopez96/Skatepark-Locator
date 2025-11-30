import { useEffect } from "react";

export default function FAQAccordion() {
    useEffect(() => {
        const $ = (window as any).$;

        $("#faq-accordion").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false,
        });

        return () => {
            try {
                $("#faq-accordion").accordion("destroy");
            } catch {}
        };
    }, []);

    return (
        <section className="w-full bg-gray-900 py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-gray-200 text-center">Frequently Asked Questions</h2>

                <div id="faq-accordion" className="bg-white rounded-lg shadow p-6 border border-gray-300">
                    <h3 className="text-xl font-semibold">What is this project?</h3>
                    <div>
                        <p>This project was created to help new people in the area find a skatepark perfect for them.</p>
                    </div>

                    <h3 className="text-xl font-semibold">What cities are supported?</h3>
                    <div>
                        <p>Right now, only Phoenix is supported, but we're working on implementing new cities based on demand.</p>
                    </div>

                    <h3 className="text-xl font-semibold">How accurate is the weather displayed?</h3>
                    <div>
                        <p>All weather data is pulled from Open Meteo. Weather accuracy is dependendent on their API.</p>
                    </div>

                    <h3 className="text-xl font-semibold">Can I save my favorite parks?</h3>
                    <div>
                        <p>Yes! Parks are saved to the users localStorage!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
