import React from 'react';
import Image from 'next/image';

export default function TokenGrid({
  title,
  action,
  isLoadingList,
  loadingError,
  nfts,
  isMarketPlace,
  buyNFT,
}) {
  const defaultOwner = '0x0000000000000000000000000000000000000000';

  const Header = ({ title }) => {
    return (
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-0">{title}</h4>
        </div>
        <div></div>
      </div>
    );
  };

  const MessageBar = ({ message }) => {
    return (
      <div className="box">
        <div className="px-3 py-3">{message}</div>
      </div>
    );
  };

  const NFTItem = ({ nft, isMarketPlace, buyNFT }) => {
    return (
      <div
        key={nft.tokenId}
        className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 d-flex"
      >
        <div className="box flex-fill">
          <div className="box-caption">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <b>{nft.name}</b>
              </div>
            </div>
            <hr />
          </div>
          <div className="box-content">
            <div className="db-table">
              <table>
                <tbody>
                  <tr>
                    <td className="pl-0 py-1" align="center" valign="middle">
                      <span>
                        {nft.image ? (
                          <Image
                            src={nft.image}
                            alt={nft.Name}
                            width="300"
                            height="300"
                          />
                        ) : (
                          <b>Unable to load image</b>
                        )}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>{nft.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Price:</b>&nbsp;{nft.price}&nbsp;MATIC
                    </td>
                  </tr>
                  {isMarketPlace && (
                    <tr>
                      <td>
                        {nft.owner == defaultOwner ? (
                          <button
                            type="button"
                            className="button button-brand"
                            onClick={() => buyNFT(nft)}
                          >
                            Buy
                          </button>
                        ) : (
                          <span>Item Sold</span>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let displayList = false;
  let displayMessage = true;
  let message;

  if (isLoadingList) {
    message = 'Loading NFTs ...';
  } else if (loadingError) {
    message = loadingError;
  } else if (nfts && nfts.length == 0) {
    message = isMarketPlace
      ? 'Marketplace is empty please check back soon!'
      : `You have not ${action} any NFTs yet!`;
  } else {
    displayList = true;
    displayMessage = false;
  }

  return (
    <>
      <Header title={title} />
      {displayMessage && <MessageBar message={message} />}
      {displayList && (
        <div className="row">
          {nfts &&
            nfts.map((nft) => (
              <NFTItem
                key={nft.tokenId}
                nft={nft}
                isMarketPlace={isMarketPlace}
                buyNFT={buyNFT}
              />
            ))}
        </div>
      )}
    </>
  );
}
