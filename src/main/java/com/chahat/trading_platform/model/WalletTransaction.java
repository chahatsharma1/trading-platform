package com.chahat.trading_platform.model;

import com.chahat.trading_platform.domain.WalletTransactionType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class WalletTransaction {
    @Id
    private Long id;

    @ManyToOne
    private Wallet wallet;

    private WalletTransactionType walletTransactionType;

    private LocalDate localDate;

    private String transferId;

    private String purpose;

    private Long amount;
}
