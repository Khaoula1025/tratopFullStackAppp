import React from "react";

function Travaux() {
    const typeTravaux = [
        "Travaux cadastraux",
        "Travaux Topographique",
        "IFE",
        "Lotissement",
    ];
    return (
        <div>
            {typeTravaux.map((travaux, key) => (
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            class="rounded-t-lg"
                            src="./assets/Cadastre.jpg"
                            alt=""
                        />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {travaux}
                            </h5>
                        </a>
                        
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Travaux;
