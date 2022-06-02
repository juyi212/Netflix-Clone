package com.netflix.clone.repository.dto;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class UserZzimPK implements Serializable {

    @EqualsAndHashCode.Include
    @Id
    private int userNo;

    @EqualsAndHashCode.Include
    @Id
    private int movieId;

}
