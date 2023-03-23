drop schema IF EXISTS skiller_champion cascade;

create schema skiller_champion;

create table skiller_champion.BUY_PASSES (
   pass_serial_number     INT8               null,
   pass_amount            INT8               null,
   pass_type           VARCHAR(120)          null,
   status              VARCHAR(120)          null,
   type                VARCHAR(120)          null,
   consensus_timestamp VARCHAR(120)          null,
   token_id            VARCHAR(120)          null,
   txn_id              VARCHAR(120)          null,
   user_account_id     VARCHAR(120)          null,
   payer_account_id    VARCHAR(120)          null,
   modified_timestamp  VARCHAR(120)          null
);

comment on table skiller_champion.BUY_PASSES  is
'DESCRIPTION:
Store information when user bought any pass';


create table skiller_champion.USE_PASSES (
   pass_serial_number     INT8               null,
   pass_amount            INT8               null,
   winner_amount          INT8               null,
   pass_type           VARCHAR(120)          null,
   status              VARCHAR(120)          null,
   type                VARCHAR(120)          null,
   consensus_timestamp VARCHAR(120)          null,
   token_id            VARCHAR(120)          null,
   txn_id              VARCHAR(120)          null,
   nft_transfer_txn_id VARCHAR(120)          null,
   user_account_id     VARCHAR(120)          null,
   payer_account_id    VARCHAR(120)          null,
   error_msg           VARCHAR(120)          null,
   modified_timestamp  VARCHAR(120)          null
);

comment on table skiller_champion.USE_PASSES  is
'DESCRIPTION:
Store information when user uses any pass';


