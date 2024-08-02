const cache = {};

const cacheMiddleware = (duration) => {
    // Retourne un middleware Express
    return (req, res, next) => {
        // Utilise l'URL de la requête comme clé de cache
        const key = req.originalUrl;

        // Vérifie si une réponse en cache existe pour cette clé
        const cachedResponse = cache[key];

        if (cachedResponse) {
            // Obtient le temps actuel
            const now = Date.now();

            // Vérifie si le cache est encore valide
            if (now - cachedResponse.time < duration) {
                console.info("The cache is working! 📥📡");
                // Si valide, renvoie immédiatement la réponse en cache
                return res.send(cachedResponse.data);
            } else {
                console.info("The cache has expired! 🧟");
                // Si expiré, supprime l'entrée du cache
                delete cache[key];
            }
        }

        // Sauvegarde la méthode 'send' originale
        res.originalSend = res.send;

        // Remplace 'res.send' par une version qui met en cache
        res.send = (body) => {
            // Stocke la réponse dans le cache avec l'heure actuelle
            cache[key] = {
                data: body,
                time: Date.now(),
            };

            // Envoie la réponse en utilisant la méthode originale
            res.originalSend(body);
        };

        // Passe au middleware suivant
        next();
    };
};

export default cacheMiddleware;
