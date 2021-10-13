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
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-0">{title}</h4>
        </div>
        <div></div>
      </div>
      <div className="row">
        {isLoadingList ? (
          <div className="box">
            <div className="px-3 py-3">Loading NFTs ...</div>
          </div>
        ) : loadingError ? (
          <div className="box">
            <div className="px-3 py-3">{loadingError}</div>
          </div>
        ) : nfts.length == 0 ? (
          <div className="box">
            {isMarketPlace ? (
              <div className="px-3 py-3">
                Marketplace is empty please check back soon!
              </div>
            ) : (
              <div className="px-3 py-3">
                You have not {action} any NFTs yet!
              </div>
            )}
          </div>
        ) : (
          nfts.map((nft) => (
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
                          <td
                            className="pl-0 py-1"
                            align="center"
                            valign="middle"
                          >
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
          ))
        )}
      </div>
    </>
  );
}
