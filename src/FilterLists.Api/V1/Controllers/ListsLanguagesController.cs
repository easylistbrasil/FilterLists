﻿using System.Threading.Tasks;
using FilterLists.Data.Entities.Junctions;
using FilterLists.Services.Seed;
using FilterLists.Services.Seed.Models.Junctions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace FilterLists.Api.V1.Controllers
{
    public class ListsLanguagesController : BaseController
    {
        public ListsLanguagesController(IMemoryCache memoryCache, SeedService seedService)
            : base(memoryCache, seedService)
        {
        }

        [HttpGet("seed")]
        public async Task<IActionResult> Seed() =>
            Json(await MemoryCache.GetOrCreate("ListsLanguagesController_Seed", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = FourHoursFromNow;
                return SeedService.GetAllAsync<FilterListLanguage, FilterListLanguageSeedDto>(
                    typeof(FilterListLanguage).GetProperty("FilterListId"),
                    typeof(FilterListLanguage).GetProperty("LanguageId"));
            }));
    }
}