﻿using System.Collections.Generic;
using FilterLists.Data.Models;

namespace FilterLists.Data.Repositories.Contracts
{
    public interface IListRepository
    {
        IEnumerable<List> GetAll();
        List GetByName(string listName);
        void Create(List list);
        void DeleteAll();
        bool Any();
    }
}