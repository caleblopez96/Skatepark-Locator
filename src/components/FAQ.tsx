import { useEffect } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/accordion";

export default function FAQAccordion() {
    useEffect(() => {
        $("#faq-accordion").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false,
        });
    }, []);

    return (
        <section className="w-full bg-gray-100 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>

                <div id="faq-accordion" className="bg-white rounded-lg shadow p-6 border border-gray-300">
                    <h3 className="text-xl font-semibold">How do I check if a park is bike-friendly?</h3>
                    <div>
                        <p className="text-gray-700">Each park will display a green checkmark ✔ if bikes are allowed, or a red ✖ if not.</p>
                    </div>

                    <h3 className="text-xl font-semibold">How does the locator find skateparks?</h3>
                    <div>
                        <p className="text-gray-700">
                            The map displays skateparks around Phoenix using preset placeholder data. In the future, this can connect to a
                            real API.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold">How are favorites saved?</h3>
                    <div>
                        <p className="text-gray-700">
                            Your favorite parks are stored using Web Storage and stay saved even when you refresh the page.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold">Where does the weather information come from?</h3>
                    <div>
                        <p className="text-gray-700">Weather icons in the navbar are powered by Open-Meteo using your ZIP code.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
