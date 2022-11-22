export const useIPFS = () => {
    const resolveLink = (url) => {
        return "https://demo.storj-ipfs.com/ipfs/" + url;
    };

    return { resolveLink };
};