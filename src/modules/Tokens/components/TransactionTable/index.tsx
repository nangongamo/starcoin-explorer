import React from 'react';
import { withTranslation } from 'react-i18next';
import { createStyles, withStyles } from '@mui/styles';
import formatNumber from '@/utils/formatNumber';
import formatTime from '@/utils/formatTime';
import { getNetwork } from '@/utils/helper';
import BaseRouteLink from '@/common/BaseRouteLink';
import Table from '@/common/Table';
// import CommonLink from '@/common/Link';
// import CommonTime from '@/common/Time';

const useStyles = () => createStyles({
  transactionsCol: {
    flex: '1 100 auto',
  },
  validatorCol: {
    flex: '1 100 auto',
  },
});

interface ExternalProps {
  tokenTransactions: any,
  tokenPrecision: any,
  sizeVisibleAt: string,
  authorVisibleAt: string,
  className?: string,
}

interface InternalProps {
  classes: any,
  t: any,
  i18n: any
}

interface Props extends ExternalProps, InternalProps {
}

class Index extends React.PureComponent<Props> {
  render() {
    const { tokenTransactions, tokenPrecision, authorVisibleAt, className, classes, t, i18n } = this.props;
    const transactions = tokenTransactions.contents;
    const amountValues: any[] = [];
    const timestampValues: any[] = [];
    const txnHashValues: any[] = [];
    const functionValues: any[] = [];
    transactions.forEach((txn: any) => {
      const txnHashUrl = `/${getNetwork()}/transactions/detail/${txn.txn_hash}`;
      txnHashValues.push(<BaseRouteLink to={txnHashUrl}>{txn.txn_hash}</BaseRouteLink>);
      amountValues.push(formatNumber(parseInt(txn.amount_value, 10) / tokenPrecision));
      timestampValues.push(formatTime(txn.timestamp, i18n.language));
      functionValues.push(txn.identifier);
    });
    const columns = [
      /*
      {
        name: t('token.function'),
        values: functionValues,
      },
      */
      {
        name: t('token.txnHash'),
        values: txnHashValues,
        minWidth: true,
        // visibleAt: authorVisibleAt,
        className: classes.validatorCol,
      },
      {
        name: t('token.amount'),
        // numeric: true,
        minWidth: true,
        values: amountValues,
      },
      {
        name: t('token.time'),
        visibleAt: authorVisibleAt,
        minWidth: true,
        values: timestampValues,
        // className: classes.validatorCol,
      },
    ];
    return <Table className={className} columns={columns} />;
  }
}

export default withStyles(useStyles)(withTranslation()(Index));
